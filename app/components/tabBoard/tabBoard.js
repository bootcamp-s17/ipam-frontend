'use strict';

import tabBoardComponent from './tabBoard.component';

let tabBoardModule = angular.module('tabBoard',[])
.component('tabBoard', tabBoardComponent);

console.log('tabBoard.js');

export default tabBoardModule;