"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var multer_2 = __importDefault(require("./config/multer"));
var PointsController_1 = __importDefault(require("./controllers/PointsController"));
var ItemsController_1 = __importDefault(require("./controllers/ItemsController"));
// index (mostrar todos), show (mostrar um), create, delete, update
var routes = express_1.default.Router();
var upload = multer_1.default(multer_2.default);
var pointsController = new PointsController_1.default();
var itemsController = new ItemsController_1.default();
routes.get('/', function (request, response) {
    return response.json('Hello: World');
});
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', upload.single('image'), pointsController.create);
exports.default = routes;
// Service Pattern
// Repository Pattern (Data Mapper)
