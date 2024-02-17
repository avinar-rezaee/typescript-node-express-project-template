import { Application } from "express";
import index from './handlers/index';
import test_post from './handlers/apis/test-post';
import test_get from './handlers/apis/test-get';

export default (app: Application) => {
    index(app);
    test_post(app);
    test_get(app);
}