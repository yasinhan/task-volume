export const projectApi = {
    getAllProjects: () => window.projectAPI.getAll(),
    createProject: (id) => window.projectAPI.create(id),
    getProject: (id) => window.projectAPI.get(id),
    saveProject: (project) => window.projectAPI.save(project),
    deleteProject: (id) => window.projectAPI.delete(id),
}