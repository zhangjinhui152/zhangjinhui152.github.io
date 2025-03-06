let blogData = [
    {
        "id": 1,
        "title": "vcpkg vscode搭建cmake ",
        "description": "使用vcpkg vscode搭建cmake 项目 使用imgui示例 ",
        "cover": "https://s3.bmp.ovh/imgs/2025/01/10/785a52aaed6337ec.jpg",
        "content": `
# 使用vcpkg vscode搭建cmake 项目 使用imgui示例
  collapsed:: true
	- 先决条件
		- 参考[[C++]CLion集成vcpkg一键完成包管理——以使用imgui为例C++包管理最佳实践 下载并集成vcpkg 首先 - 掘金 (juejin.cn)](https://juejin.cn/post/7247489258678698045#heading-3)
		- 安装cmake 安装vcpkg
		- 了解CMakePresets.json 是什么
		- vscode 安装cmakeTool插件
	- 步骤
		- vcpkg 安装imgui
		  \`\`\`bash
		  vcpkg install imgui[core,dx12-binding,win32-binding]:x64-windows
		  \`\`\`
		- cmake 创建项目 使用vscode 的cmake 插件 按住 ctrl +shift + p 输入cmake quickStart 后选中
		- 创建CMakePresets.json
			- 
			- \`\`\`bash{
			      "version": 8,
			      "configurePresets": [
			          {
			              "name": "test",
			              "displayName": "Visual Studio Community 2022 Release - amd64",
			              "description": "将编译器用于 Visual Studio 17 2022 (x64 体系结构)",
			              "generator": "Visual Studio 17 2022",
			              "binaryDir": "\${sourceDir}/out/build/\${presetName}",
			            	// 这个填你的vcpkg.cmake 地址
			              "toolchainFile": "D:/bainc/C++Lib/vcpkg/scripts/buildsystems/vcpkg.cmake"
			          },
			         
			      ]
			  }\`\`\`
			  
		- cmake 文件
		  collapsed:: true
			- \`\`\`CMakeLists.txt
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
			  \`\`\`
		- main.cpp 文件来自 [imgui/examples/imgui_impl_dx12.cpp at c206a193737811193a0b48ef2d35fe028fa0996e · ocornut/imgui (github.com)](https://github.com/ocornut/imgui/blob/c206a193737811193a0b48ef2d35fe028fa0996e/examples/imgui_impl_dx12.cpp)
		- 如果main.cpp 编译失败找不到符号链接可以试试
		  collapsed:: true
			- \`\`\`c++
			  #ifdef DX12_ENABLE_DEBUG_LAYER
			  #include <dxgidebug.h>
			  #pragma comment(lib, "dxguid.lib")
			  #此处增加这个
			  #pragma comment(lib, "d3d12.lib")
			  #pragma comment(lib, "dxgi.lib")
			  #pragma comment(lib, "d3dcompiler.lib")
			  #endif
			  
			  \`\`\`
			- 或 cmake 文件 添加 d3d12 dxgi
			- target_link_libraries(\${PROJECT_NAME} PRIVATE imgui::imgui d3d12 dxgi)`
    },
    {
        "id": 2,
        "title": "conan 指定编译器为NInja",
        "description": "conan 指定编译器为NInja install 对应的包",
        "cover": "https://s3.bmp.ovh/imgs/2024/09/25/d91b098088cce933.jpg",
        "content": ` # conan 指定编译器为NInja install 对应的包
  collapsed:: true
	- conan install . --output-folder=build --build=missing -c tools.cmake.cmaketoolchain:generator=Ninja
	- 破案了 我想要构建工具是Ninja 我在conan profile detect --name=my_custom_profile创建了一个新的配置文件
	- \`\`\`
	  [settings]
	  arch=x86_64
	  build_type=Release
	  compiler=msvc
	  compiler.cppstd=14
	  compiler.runtime=dynamic
	  compiler.version=193
	  os=Windows
	  
	  # 新增了这两行 指定了Ninja
	  [conf]
	  tools.cmake.cmaketoolchain:generator=Ninja
	  \`\`\`
	- 然后使用conan create . -pr=my_custom_profile
	- **官方原文**此配置将传递到由 CMakeToolchain 生成的 conan_toolchain.cmake 文件，然后将使用 Ninja 生成器。您应该看到以下输出片段，表明正在使用 Ninja 生成器：
	- 然后我的conan py文件
	- \`\`\`
	  from conan import ConanFile
	  from conan.tools.cmake import CMakeToolchain, CMake, cmake_layout, CMakeDeps
	  
	  
	  class fooRecipe(ConanFile):
	      name = "foo"
	      version = "0.1.0"
	      package_type = "application"
	  
	      # Optional metadata
	      license = "<Put the package license here>"
	      author = "<Put your name here> <And your email here>"
	      url = "<Package recipe repository url here, for issues about the package>"
	      description = "<Description of foo package here>"
	      topics = ("<Put some tag here>", "<here>", "<and here>")
	  
	      # Binary configuration
	      settings = "os", "compiler", "build_type", "arch"
	  
	      # Sources are located in the same place as this recipe, copy them to the recipe
	      exports_sources = "CMakeLists.txt", "src/*"
	  
	      def layout(self):
	          cmake_layout(self)
	  
	      def generate(self):
	          deps = CMakeDeps(self)
	          deps.generate()
	          tc = CMakeToolchain(self)
	          tc.generate()
	  
	      def build(self):
	          cmake = CMake(self)
	          cmake.configure()
	          cmake.build()
	  
	      def package(self):
	          cmake = CMake(self)
	          cmake.install()
	      def requirements(self):
	      	//依赖zlib
	          self.requires("zlib/1.2.11")
	      
	  
	      
	  
	  \`\`\`
	- 哎 最坑的是从conan 下载的时候命令是
	  conan install . --output-folder=build2 --build=missing -c tools.cmake.cmaketoolchain:generator=Ninja
	  或 conan install . --output-folder=build2 --build=missing -pr my_custom_profile 
	  这样才能让下载的时候指定generator是Ninja而不是自带的vs、
	- 之后cmake 应用conan_toolchain.cmake 的地址就行了
	- \`\`\`
	  cmake_minimum_required(VERSION 3.15)
	  project(foo CXX)
	  
	  # include(./build2/build/generators/conan_toolchain.cmake)
	  # find_package(ZLIB REQUIRED)
	  add_executable(foo src/foo.cpp src/main.cpp)
	  
	  
	  
	  install(TARGETS foo DESTINATION "."
	          RUNTIME DESTINATION bin
	          ARCHIVE DESTINATION lib
	          LIBRARY DESTINATION lib
	          )
	  # target_link_libraries(foo ZLIB::ZLIB)
	  \`\`\`
	- ps winows环境用conan默认配置运行就行了，不然有些文件clang会编译不了 不折腾了
	  collapsed:: true
- 子组件禁止穿透到父组件
  collapsed:: true
	- \`\`\`js
	  @touchmove.stop.prevent="()=>{}"
	  \`\`\`
- [如何获取程序运行的目录？](https://segmentfault.com/q/1010000042689063)
  collapsed:: true
	- std::cout << std::filesystem::path(argv[0]) << std::endl;`
    },
    {
        "id": 3,
        "title": "loki日志收集",
        "description": "This is the first item",
        "cover": "https://s3.bmp.ovh/imgs/2024/08/21/ea1485e32b39b09d.jpg",
        "content": `# 日志收集

\`\`\`
sudo helm upgrade --install loki grafana/loki-stack \
  --namespace=loki \
  --set promtail.enabled=true \
  --set grafana.enabled=true \
  --kubeconfig /etc/rancher/k3s/k3s.yaml
\`\`\`
\`\`\`
helm get values loki -n default
\`\`\`
不知道为什么就好了 我貌似只有重启和改ip？？？？
 sudo kubectl get secret loki-grafana -n default -o jsonpath="{.data.admin-password}" | base64 --decode ; echo             获取密码grafana
 
\`\`\`
{job="default/frontend-nginx"}

|="GET"

|pattern \`<ip> - - [<time>] "<method> <uri> <_>" <status> <size> <_> "<agent>" <_> \`

|line_format "{{.time}} {{.ip}} {{.method}} 1"


{job="default/frontend-nginx"}

|="GET"

|pattern \`<ip> - - [<time>] "<method> <uri> <_>" <status> <size> <_> "<agent>" <_> \`

|line_format "2022-11-01 10:00:00 {{.ip}} {{.method}} {{.uri}} 1"


sum by (method) (

count_over_time(

{job="default/frontend-nginx"}

|="GET"

| pattern \`<ip> - - [<time>] "<method> <uri> <_>" <status> <size> <_> "<agent>" <_>\`

| __error__ = ""

[1h] // 按 1 小时统计

)

)



sum by (method) (

count_over_time(

{job="default/frontend-nginx"}

|~"GET|POST"

| pattern \`<ip> - - [<time>] "<method> <uri> <_>" <status> <size> <_> "<agent>" <_>\`

| __error__ = ""

[1h]

)

)
\`\`\`
- 记得打开设置的标签 让你知道pattern 究竟有没有获取到标签
- 然后通过line_format 来格式化日期
sidecard模式
- 需要挂载同一个盘！`
    }
]