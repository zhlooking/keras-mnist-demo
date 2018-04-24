## For Backend

### recommended: use virtualenv/virtualenvwrapper
`cd backend`

`brew install python3`

`mkvirtualenv keras-demo --python=python3`

`workon keras-demo`

`pip install -r deps.txt`

`python3 mnist.py`

`cd output && python ../encoder.py -q mnist_cnn.h5`

`cp mnist_cnn.bin ../../dist/`


### without virtualenv
`cd backend`

`brew install python3.6`

`brew install pip3`

`pip3 install -r deps.txt`

`python3 mnist.py`

`cd output && python ../encoder.py -q mnist_cnn.h5`

`cp mnist_cnn.bin ../../dist/`


## For Frontend
`npm install`

`node server.js`

`open browser && input url -> localhost:3009`
