import keras
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras import backend as K

batch_size = 128
num_classes = 10
epochs = 1

# input image dimension
img_rows, img_cols = 28, 28

# train data / test data
(x_train, y_train), (x_test, y_test) = mnist.load_data()

if K.image_data_format() == 'channels_first':
    x_train = x_train.reshape(x_train.shape[0], 1, img_rows, img_cols)
    x_test = x_test.reshape(x_test.shape[0], 1, img_rows, img_cols)
    input_shape = (1, img_rows, img_cols)
else:
    x_train = x_train.reshape(x_train.shape[0], img_rows, img_cols, 1)
    x_test = x_test.reshape(x_test.shape[0], img_rows, img_cols, 1)
    input_shape = (img_rows, img_cols, 1)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')

x_train /= 255
x_test /= 255

print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

# convert class vectors to binary class metrics
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

# initial keras model
model = Sequential()
# Add 1st conv2d cnn layer --> 32 个3*3 卷积核的卷基层
# kernel_size ???
# 激活模型: 正则化
# input_shape ???
model.add(Conv2D(32,
                 kernel_size=(3, 3),
                 activation='relu',
                 input_shape=input_shape))

# Add 2rd conv2d cnn layer --> 64 个 3*3 卷积核的卷基层
model.add(Conv2D(64, (3, 3), activation='relu'))

# Add Pooling2D layer --> 采样因子为 (2,2) 的池化层
model.add(MaxPooling2D(pool_size=(2, 2)))
# Dropout层
model.add(Dropout(0.25))
# Flatten层
model.add(Flatten())
# ReLu全连接层
model.add(Dense(128, activation='relu'))
# Dropout层
model.add(Dropout(0.5))
# Softmax 全连接层
model.add(Dense(num_classes, activation='softmax'))

# 编译
model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.Adadelta(),
              metrics=['accuracy'])

# 装入数据
model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          validation_data=(x_test, y_test))

score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss: ', score[0])
print('Test accuracy: ', score[1])

model.save('output/mnist_cnn.h5')
