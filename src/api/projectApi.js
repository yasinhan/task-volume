export const projectApi = {
    getAllProjects: () => window.projectAPI.getAll(),
    createProject: (id) => window.projectAPI.create(id),
    getProject: (id) => window.projectAPI.get(id)
}