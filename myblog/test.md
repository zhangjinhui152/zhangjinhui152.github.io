- 使用vcpkg vscode搭建cmake 项目 使用imgui示例

	- 先决条件

		- 参考[[C++]CLion集成vcpkg一键完成包管理——以使用imgui为例C++包管理最佳实践 下载并集成vcpkg 首先 - 掘金 (juejin.cn)](https://juejin.cn/post/7247489258678698045#heading-3)

		- 安装cmake 安装vcpkg

		- 了解CMakePresets.json 是什么

		- vscode 安装cmakeTool插件

	- 步骤

		- vcpkg 安装imgui
		  ```bash
		  vcpkg install imgui[core,dx12-binding,win32-binding]:x64-windows
		  ```

		- cmake 创建项目 使用vscode 的cmake 插件 按住 ctrl +shift + p 输入cmake quickStart 后选中

		- 创建CMakePresets.json

			-
			  ```json
			  {
			      "version": 8,
			      "configurePresets": [
			          {
			              "name": "test",
			              "displayName": "Visual Studio Community 2022 Release - amd64",
			              "description": "将编译器用于 Visual Studio 17 2022 (x64 体系结构)",
			              "generator": "Visual Studio 17 2022",
			              "binaryDir": "${sourceDir}/out/build/${presetName}",
			            	// 这个填你的vcpkg.cmake 地址
			              "toolchainFile": "D:/bainc/C++Lib/vcpkg/scripts/buildsystems/vcpkg.cmake"
			          },
			         
			      ]
			  }
			  ```

		- cmake 文件

			-
			  ```CMakeLists.txt
			  cmake_minimum_required(VERSION 3.5.0)
			  project(imgui VERSION 0.1.0 LANGUAGES C CXX)
			  
			  # set(VCPKG_TARGET_TRIPLET x64-windows)
			  # set(VCPKG_HOST_TRIPLET x64-windows)
			  include(D:/bainc/C++Lib/vcpkg/scripts/buildsystems/vcpkg.cmake)
			  
			  add_executable(imgui main.cpp)
			  # find_package(absl CONFIG REQUIRED)
			  # # note: 187 additional targets are not displayed.
			  # target_link_libraries(imgui PRIVATE absl::any absl::strings absl::string_view
			  # absl::algorithm
			  # absl::base
			  # absl::debugging
			  # absl::flat_hash_map
			  # absl::memory
			  # absl::meta
			  # absl::numeric
			  # absl::str_format
			  # absl::strings
			  # absl::synchronization
			  # absl::time
			  # )
			  # find_package(fmt CONFIG REQUIRED)
			  # target_link_libraries(imgui PRIVATE fmt::fmt)
			  
			  
			  find_package(imgui CONFIG REQUIRED)
			  target_link_libraries(imgui PRIVATE imgui::imgui)
			  ```

		- main.cpp 文件来自 [imgui/examples/imgui_impl_dx12.cpp at c206a193737811193a0b48ef2d35fe028fa0996e · ocornut/imgui (github.com)](https://github.com/ocornut/imgui/blob/c206a193737811193a0b48ef2d35fe028fa0996e/examples/imgui_impl_dx12.cpp)

		- 如果main.cpp 编译失败找不到符号链接可以试试

			-
			  ```c++
			  #ifdef DX12_ENABLE_DEBUG_LAYER
			  #include <dxgidebug.h>
			  #pragma comment(lib, "dxguid.lib")
			  #此处增加这个
			  #pragma comment(lib, "d3d12.lib")
			  #pragma comment(lib, "dxgi.lib")
			  #pragma comment(lib, "d3dcompiler.lib")
			  #endif
			  
			  ```

			- 或 cmake 文件 添加 d3d12 dxgi

			- target_link_libraries(${PROJECT_NAME} PRIVATE imgui::imgui d3d12 dxgi)
