cmake_minimum_required(VERSION 4.2)

project(tjhlp-client VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(MSVC)
    add_compile_options(/Zc:__cplusplus)
endif()

find_package(Qt6 REQUIRED COMPONENTS 
    Core Widgets WebEngineWidgets WebChannel)

# Front-end
# 1. 找到 pnpm 程序
if(DEFINED $ENV{PNPM_CMD})
    set(PNPM_CMD "$ENV{PNPM_CMD}" CACHE FILEPATH "Path to pnpm executable" FORCE)
else()
    find_program(PNPM_CMD pnpm pnpm.cmd REQUIRED)
endif()

find_program(POWERSHELL_EXE NAMES pwsh powershell REQUIRED)

# 2. 定义前端源码目和输出目录
set(FRONTEND_DIR "${CMAKE_SOURCE_DIR}/client-ui")
set(FRONTEND_DIST "${FRONTEND_DIR}/dist")

# 3. 定义一个自定义命令：执行 build
add_custom_command(
    OUTPUT "${FRONTEND_DIST}/index.html"  # 通过检查这个文件是否存在判断是否需要运行
    COMMAND ${POWERSHELL_EXE} -Command ${PNPM_CMD} install            # 安装依赖 (也可以单独手动运行)
    COMMAND ${POWERSHELL_EXE} -Command ${PNPM_CMD} run build          # 打包
    WORKING_DIRECTORY ${FRONTEND_DIR}     # 在 client-ui 目录下运行
    COMMENT "正在构建前端资源 (Vite)..."
)

# 4. 创建一个 Target 绑定这个命令
add_custom_target(frontend-build DEPENDS "${FRONTEND_DIST}/index.html")

add_subdirectory(client-core)

# 5. 关键：让 C++ 项目依赖前端构建任务
add_dependencies(tjhlp-client frontend-build)
