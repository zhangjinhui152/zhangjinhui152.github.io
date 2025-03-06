# 日志收集

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
- 需要挂载同一个盘！