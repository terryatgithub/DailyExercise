# TensorFlow 

## TF.keras核心高阶API

## TF.keras
python
依赖包 
cv2 
keras
mnist 数据集包 flower
numpy 数据分析的包 
matplotlib.pyplot 二维

pip install opencv-python
pip install keras

训练集 模型有一定的泛化能力
先训练数据 x_train 输入 y_train 输出
后测试数据 x_test 输入 y_test 输出

one-hot 编码
MSE mean squared error 均方差
    mean absolute error 
cross entropy 交叉熵损失
loss 损失函数

#### 建模
开始训练

训练模型

模型结构

训练
    卷积核 一般建议从3*3开始 
    调参：一般需要经验（炼丹）
    Epoches 几轮
Q:为什么不用正确率accu评价模型，而用损失值loss评价模型？

测试


## TF.data 输入模块




## 卷积神经网络
Lenet
Sequential: 序贯式模型
数据流入
convolution2D 卷积
maxpool pooling
flatten 拉平图像
Dropout 防止过拟合
Dense 做数据全连接
数据流出
