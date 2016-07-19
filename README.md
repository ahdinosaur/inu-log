# inu-log

monitor [`inu`](https://github.com/ahdinosaur/inu) apps

```shell
npm install --save inu-log
```

## usage

### `log = require('inu-log')`

### `logged = log(app)`

given an [`inu`](https://github.com/ahdinosaur/inu) app, returns a new app that monitors `app.init`, `app.update`, and `app.run`.

## credit

initial code lifted from [`gcanti/tom#monitoring`](https://github.com/gcanti/tom#monitoring)

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
