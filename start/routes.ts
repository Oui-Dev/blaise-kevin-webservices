/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
const AuthController = () => import('#controllers/auth_controller');
const UsersController = () => import('#controllers/users_controller');
const ProjectsController = () => import('#controllers/projects_controller');
const SkillsController = () => import('#controllers/skills_controller');

router
    .group(() => {
        // Public routes
        router.get('projects/', [ProjectsController, 'index']);
        router.post('auth/login', [AuthController, 'login']);

        // Authenticated routes
        router
            .group(() => {
                router.get('users/', [UsersController, 'index']);
                router.post('auth/logout', [AuthController, 'logout']);

                // Admin routes
                router
                    .group(() => {
                        // Users routes
                        router
                            .group(() => {
                                router.get('/:id', [UsersController, 'show']);
                                router.post('/', [UsersController, 'create']);
                                router.put('/:id', [UsersController, 'update']);
                                router.delete('/:id', [UsersController, 'delete']);
                            })
                            .prefix('/users');

                        // Projects routes
                        router
                            .group(() => {
                                router.get('/:id', [ProjectsController, 'show']);
                                router.post('/', [ProjectsController, 'create']);
                                router.put('/:id', [ProjectsController, 'update']);
                                router.delete('/:id', [ProjectsController, 'delete']);
                            })
                            .prefix('/projects');

                        // Skills routes
                        router
                            .group(() => {
                                router.get('/', [SkillsController, 'index']);
                                router.get('/:id', [SkillsController, 'show']);
                                router.post('/', [SkillsController, 'create']);
                                router.put('/:id', [SkillsController, 'update']);
                                router.delete('/:id', [SkillsController, 'delete']);
                            })
                            .prefix('/skills');
                    })
                    .use(middleware.userIsAdmin());
            })
            .use(
                middleware.auth({
                    guards: ['api'],
                })
            );
    })
    .prefix('api/v1/');
