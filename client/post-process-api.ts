/**
 * Post-process generated API files
 * 将生成的代码转换为项目风格
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import * as process from 'process'

interface FileTransform {
  filePath: string
  originalContent: string
  newContent: string
}

/**
 * 转换生成的 API 文件
 */
function transformApiFile(filePath: string): FileTransform | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    let newContent = content

    // 1. 移除不需要的注释
    newContent = newContent.replace(/\/\/ @ts-ignore\n/g, '')
    newContent = newContent.replace(/\/\* eslint-disable \*\/\n/g, '')

    // 2. 替换 import 语句
    // 移除 AxiosRequestConfig 导入（如果存在）
    newContent = newContent.replace(
      /import type { AxiosRequestConfig } from 'axios';\n/g,
      ''
    )

    // 确保有 apiClient 导入
    if (!newContent.includes("import apiClient from '../apiClient'")) {
      // 在文件开头添加导入
      newContent = `import apiClient from '../apiClient'\n\n${newContent}`
    }

    // 3. 替换 request 调用为 apiClient 调用
    // 匹配: request<any>('/path', { method: 'GET', ... })
    const requestRegex = /return request<any>\((.*?)\);/gs
    
    newContent = newContent.replace(requestRegex, (match, args) => {
      // 解析参数
      const urlMatch = args.match(/['"`]([^'"`]+)['"`]/)
      const methodMatch = args.match(/method:\s*['"`](\w+)['"`]/)
      const hasParams = args.includes('params:')
      const hasData = args.includes('data:')
      const hasBody = args.includes('body')

      if (!urlMatch || !methodMatch) return match

      const url = urlMatch[1]
      const method = methodMatch[1].toLowerCase()

      // 构建新的调用
      let newCall = `return apiClient.${method}({ url: '${url}'`

      if (hasParams) {
        newCall += ', params'
      }
      if (hasData || hasBody) {
        // 检查是否使用了 body 变量
        if (args.includes('data: body')) {
          newCall += ', data: body'
        } else {
          newCall += ', data'
        }
      }

      // 添加 options 参数
      newCall += ', ...options })'

      return newCall
    })

    // 4. 处理模板字符串 URL (已经转换过的)
    // 修复: url: '/api/person/${param0}' -> url: `/api/person/${param0}`
    newContent = newContent.replace(
      /url:\s*'([^']*\$\{[^}]+\}[^']*)'/g,
      (_match, url) => `url: \`${url}\``
    )

    // 5. 替换 AxiosRequestConfig 为更通用的类型
    newContent = newContent.replace(
      /options\?: AxiosRequestConfig/g,
      'options?: { [key: string]: any }'
    )
    
    // 6. 移除旧的 options 展开语法
    newContent = newContent.replace(/\.\.\.\(options \|\| \{\}\),?\n?/g, '')

    // 6. 清理多余的空行
    newContent = newContent.replace(/\n\n\n+/g, '\n\n')

    return {
      filePath,
      originalContent: content,
      newContent,
    }
  } catch (error) {
    console.error(`Error transforming file ${filePath}:`, error)
    return null
  }
}

/**
 * 移动和重命名文件
 * 将 /services/ims/*.ts 移动到 /services/*.ts
 */
function reorganizeFiles(servicesDir: string): void {
  const imsDir = path.join(servicesDir, 'ims')
  
  if (!fs.existsSync(imsDir)) {
    console.log('⚠️  No ims directory found, skipping reorganization')
    return
  }

  const files = fs.readdirSync(imsDir).filter(f => f.endsWith('.ts'))
  
  console.log(`\n📦 Reorganizing ${files.length} file(s)...`)

  for (const file of files) {
    const oldPath = path.join(imsDir, file)
    
    // 跳过 index.ts 和 typings.d.ts
    if (file === 'index.ts' || file === 'typings.d.ts') {
      continue
    }

    // 重命名: person.ts -> personService.ts
    const baseName = path.basename(file, '.ts')
    const newFileName = `${baseName}Service.ts`
    const newPath = path.join(servicesDir, newFileName)

    // 移动文件
    fs.renameSync(oldPath, newPath)
    console.log(`   ✓ Moved: ${file} -> ${newFileName}`)
  }

  // 移动 typings.d.ts 到 services 目录
  const typingsPath = path.join(imsDir, 'typings.d.ts')
  if (fs.existsSync(typingsPath)) {
    const newTypingsPath = path.join(servicesDir, 'typings.d.ts')
    fs.renameSync(typingsPath, newTypingsPath)
    console.log(`   ✓ Moved: typings.d.ts`)
  }

  // 删除空的 ims 目录
  try {
    const remainingFiles = fs.readdirSync(imsDir)
    if (remainingFiles.length === 0 || (remainingFiles.length === 1 && remainingFiles[0] === 'index.ts')) {
      fs.rmSync(imsDir, { recursive: true, force: true })
      console.log(`   ✓ Removed empty ims directory`)
    }
  } catch (error) {
    console.warn(`   ⚠️  Could not remove ims directory:`, error)
  }
}

/**
 * 处理所有 API 文件
 */
function processAllFiles(): void {
  const servicesDir = path.join(process.cwd(), 'src', 'api', 'services')

  if (!fs.existsSync(servicesDir)) {
    console.error(`❌ Services directory not found: ${servicesDir}`)
    return
  }

  // 1. 先重组文件结构
  reorganizeFiles(servicesDir)

  // 2. 获取所有 .ts 文件（排除 .d.ts）
  const files = fs
    .readdirSync(servicesDir)
    .filter((f: string) => f.endsWith('.ts') && !f.endsWith('.d.ts') && f !== 'index.ts')
    .map((f: string) => path.join(servicesDir, f))

  console.log(`\n🔄 Processing ${files.length} API file(s)...`)

  let transformedCount = 0

  for (const file of files) {
    const result = transformApiFile(file)
    if (result && result.originalContent !== result.newContent) {
      fs.writeFileSync(file, result.newContent, 'utf8')
      console.log(`   ✓ Transformed: ${path.basename(file)}`)
      transformedCount++
    }
  }

  console.log(`\n✅ Transformed ${transformedCount} file(s)`)
}

/**
 * 格式化文件
 */
function formatFiles(): void {
  try {
    console.log('\n📝 Formatting files...')
    const servicesDir = path.join(process.cwd(), 'src', 'api', 'services')

    if (fs.existsSync(servicesDir)) {
      try {
        execSync(`npx eslint --fix "${servicesDir}/**/*.ts"`, {
          stdio: 'pipe',
          encoding: 'utf8',
        })
        console.log('✅ Formatting completed')
      } catch {
        try {
          execSync(`npx prettier --write "${servicesDir}/**/*.ts"`, {
            stdio: 'pipe',
            encoding: 'utf8',
          })
          console.log('✅ Formatting completed with prettier')
        } catch {
          console.warn('⚠️  Formatting skipped (no formatter available)')
        }
      }
    }
  } catch (error) {
    console.error('❌ Formatting failed:', error)
  }
}

/**
 * 主函数
 */
function main(): void {
  console.log('🚀 Starting API post-processing...')

  try {
    processAllFiles()
    formatFiles()
    console.log('\n🎉 All done!')
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  }
}

// 检查是否直接运行此脚本
if (typeof require !== 'undefined' && require.main === module) {
  main()
}

export { transformApiFile, reorganizeFiles, processAllFiles }
