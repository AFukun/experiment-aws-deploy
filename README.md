# Experiment AWS Deploy

使用 AWS SDK for JavaScript 部署app到 AWS 服务器上

## 开发环境

下载 [Node.js](https://nodejs.org) Runtime 安装到本地

运行以下命令验证安装

```shell
node --version
npm --version
```

## 本地开发

必须从 main 新建分支进行开发

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

- feat - 新功能
- fix - 修 bug
- doc - 改文档
- style - 格式化代码
- test - 添加测试文件
- chore - 非生产代码的变化（杂务）

`<message>` 为 commit message 内容，小写有空格无标点

`<describe>` 为兼容字符串，小写无空格用`-`连接，如 `valid-branch-name`

## 本地部署目标项目到服务器上：

### 环境准备

首先安装Node.js，并确认安装是否成功：

```bash
node --version
npm --version
```

git clone将本仓库下载到本地之后，安装第三方包：
```bash
npm install	
```

### 目标部署项目的存放

- 将你所需要部署的项目编译完成后，将**编译好的可执行文件以及相关的依赖库**放入至**app**文件夹中

- 修改**config**文件夹中名为**run.sh**的shell脚本，export一些你的项目所需要的**环境变量**以及**执行项目运行的入口**（即运行项目的可执行文件）

### AWS的一些设置

注册Amazon的账号，进入到My Security Credentials

![](https://raw.githubusercontent.com/Amoukk/aws/master/1.png?token=ANFD2RN7ZRHTRY5LDVK6YM3ALKRYW)

#### 创建组（Groups）

在左侧的Access management中进入Groups创建一个组或者选择已有的组，确保这个组包含以下policy即可

![](https://raw.githubusercontent.com/Amoukk/aws/master/3.png?token=ANFD2RNBCZEFCQSCIAR6DSTALKUT2)



#### 创建用户（Users）

在左侧的Access management中进入Users创建用户

![](https://raw.githubusercontent.com/Amoukk/aws/master/4.png?token=ANFD2RMRIV52NKCSKBUYKPLALKVEO)

勾选加入该用户到刚刚创建的Groups中

![](https://raw.githubusercontent.com/Amoukk/aws/master/5.png?token=ANFD2RKICLFW4KPYZNXMXV3ALKVIK)

创建用户之后一定要记得把这个用户的私钥保存到本地

![](https://raw.githubusercontent.com/Amoukk/aws/master/6.png?token=ANFD2ROYPV6X6WVKC4KOOHLALKVMA)

在`~/.aws`中创建credentials文件，将刚刚保存的用户id和私钥按如下方式填写即可

![](https://raw.githubusercontent.com/Amoukk/aws/master/9.png?token=ANFD2RJTPL4L5UTKRCGDGHLALKY5Y)

#### 创建身份（Roles）

在左侧的Access management中进入Roles创建身份，选择EC2

![](https://raw.githubusercontent.com/Amoukk/aws/master/8.png?token=ANFD2ROCHEI62HDT6CAQV6DALKWZE)

确保Roles中有以下policy即可

![](https://raw.githubusercontent.com/Amoukk/aws/master/7.png?token=ANFD2RK6EUG7H2GCV4GUURLALKWPI)

#### 创建接入实例的键值对（key pairs）

进入EC2实例管理界面

![](https://raw.githubusercontent.com/Amoukk/aws/master/10.png?token=ANFD2RLLJLPXHMDYBHH3NVLALK2YI)

左侧导航栏中找到Key Pairs

![](https://raw.githubusercontent.com/Amoukk/aws/master/11.png?token=ANFD2RLYCCNUVT33KL3V4MLALK27W)

创建key pair，文件选择`.pem`格式，然后会提示下载该key pair，一定要保存到`~/.aws`文件夹中，也就是前面创建Users中所提到的文件夹

### 项目部署

#### 实例参数

回到部署功能的项目中，在`config/isntanceParams.json`中填写生成实例所需要的一些参数（即启动什么类型的机器来运行你的项目）

以下是主要的参数

- ImageId：实例的镜像，如Ubuntu或CentOS，也可以去镜像市场中或者自己制作带有默认环境的镜像，方便以后有相同运行环境的实例使用。
- InstanceType：实例的类型，即实例的物理机器类型，有着不同的机器性能，需要自行挑选

- KeyName：之前创建的key pair。一般AWS上的key pair和本地.pem文件同名，没有特殊需求不用修改名称
- MinCount/MaxCount：实例的数量，AWS会自动帮我们将生成的实例数量控制在这两个数的范围内
- IamInstanceProfile：给实例授权，让实例也可以使用AWS的服务。

详细的参数设置请在下面网址中

https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RunInstances.html

#### 开始部署你的项目

注意：执行每一条指令都先要等待完成，再执行下一步指令。

在AWS上部署一定数量的Instances，也即开启多台计算机：

```shell
node deploy
```

将app文件夹上传到计算机上：

```shell
node upload
```

将本地的run.sh通过接口在AWS上的机器运行，运行你的项目：

```shell
node run
```

然后可以通过AWS Instances管理页面，点击某个实例，点击右上角connect远程进入该实例查看是否已经运行了你的项目。

