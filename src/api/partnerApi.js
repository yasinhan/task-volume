export const partnerApi = {
    getAllPartner: () => window.partnerAPI.getAll(),
    addPartner: (name) => window.partnerAPI.create(name),
}