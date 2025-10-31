import 'dotenv/config'
import process from 'node:process'

export default {
  // Swagger/OpenAPI JSON schema URL
  schemaPath: `${process.env.VITE_PROXY_TARGET}/swagger-json`,
  
  // Output directory - 生成到 services 目录
  serversPath: './src/api/services',
  
  // 项目名称和命名空间
  projectName: 'ims',
  namespace: 'API',
  
  // 不使用默认的 request 导入，我们会在 hook 中自定义
  requestLibPath: "import apiClient from '../apiClient'",
  
  // 请求函数名称
  requestImportStatement: '',
  
  hook: {
    // 自定义生成的函数名
    customFunctionName: (data: any) => {
      const method = data.method.toLowerCase()
      const path = data.path || ''

      // Convert path to camelCase
      const toCamelCase = (path: string) => {
        return path
          .replace(/^\/+/, '') // Remove leading slashes
          .replace(/\/+/g, '/') // Normalize multiple slashes
          .replace(/^api\//, '') // Remove 'api/' prefix if exists
          .split('/')
          .map((segment, index) => {
            // Handle path parameters like {id}
            const cleanSegment = segment.replace(/[{}]/g, '')
            
            if (index === 0) return cleanSegment.toLowerCase()

            return (
              cleanSegment.charAt(0).toUpperCase() + 
              cleanSegment.slice(1).toLowerCase()
            )
          })
          .join('')
      }

      const camelCasePath = toCamelCase(path)
      const functionName = `${method}${
        camelCasePath.charAt(0).toUpperCase()
      }${camelCasePath.slice(1)}`
      
      return functionName
    },
    
    // 自定义文件顶部导入
    customFileTop: (_data: any) => {
      return `import apiClient from '../apiClient'\n\n`
    },
  },
  
  // Generation options
  mock: false,
  typescript: true,
  nullable: false,
}
