export const projectApi = {
    getAllPartner: () => window.partnerAPI.getAll(),
    addPartner: (name) => window.partnerAPI.create(name),
}