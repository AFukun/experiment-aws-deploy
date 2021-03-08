# Experiment AWS Deploy
使用 AWS SDK for JavaScript 部署实验性的区块链系统到AWS服务器上

## 开发环境

下载 [Node.js](https://nodejs.org) Runtime 安装到本地

运行以下命令验证安装

```shell
node --version
npm --version
```

## 本地测试

```shell
npm intall
npm start
```

## 本地开发

必须从main新建分支进行开发

```shell
npm intall
git checkout main
git checkout -b <type>/<describe>
```

### 开发规范

```shell
git commit -m <type>: <message>
git checkout -b <type>/<describe>
```

`<type>` 可取值：

* feat - 新功能
* fix - 修bug
* doc - 改文档
* style - 格式化代码
* test - 添加测试文件
* chore - 非生产代码的变化（杂务）

`<message>`  为commit message内容，小写有空格无标点

`<describe>` 为兼容字符串，小写无空格用`-`连接，如 `valid-branch-name`