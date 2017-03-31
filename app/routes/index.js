import initUserRoutes from './userRouter';

export default function initRoutes(app) {
  app.use('/', initUserRoutes());
  //app.use('/repositories', initFacultyRoutes());
}