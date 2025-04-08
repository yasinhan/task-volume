export const projectApi = {
    getLatestProjects: (number) => window.projectAPI.getLatest(number),
    getAllProjects: () => window.projectAPI.getAll(),
    createProject: () => window.projectAPI.create(),
    getProject: (id) => window.projectAPI.get(id),
    saveProject: (project) => window.projectAPI.save(project),
    deleteProject: (id) => window.projectAPI.delete(id),
}