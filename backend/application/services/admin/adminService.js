class AdminService {
    constructor(AdminDatabase) {
        this.AdminDatabase = AdminDatabase;
    }

    async createAdmin(postBody) {
        const admin = await this.AdminDatabase.createAdmin(postBody);
        if (!admin) {
            throw new Error(`admin not found`);
        }
        return admin;
    }
    async login(postBody) {
        const admin = await this.AdminDatabase.login(postBody);
        if (!admin) {
            throw new Error(`admin not found`);
        }
        return admin;
    }

    async getAdmin(page, limit) {
        const admin = await this.AdminDatabase.getAdmin(page, limit);
        if (!admin) {
            throw new Error(`admin not found`);
        }
        return admin;
    }

    async updateAdmin(postBody, id) {
        const admin = await this.AdminDatabase.updateAdmin(postBody, id);
        if (!admin) {
            throw new Error(`admin not found`);
        }
        return admin;
    }


}

module.exports = { AdminService };