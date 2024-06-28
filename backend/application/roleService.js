class RoleService {
    constructor(RoleDatabase) {
        this.RoleDatabase = RoleDatabase;
    }

    async createRole(postBody) {
        const role = await this.RoleDatabase.createRole(postBody);
        if (!role) {
            throw new Error(`role not found`);
        }
        return role;
    }

    async getRole() {
        const role = await this.RoleDatabase.getRole();

        if (!role) {
            throw new Error(`role not found`);
        }
        return role;
    }

    async updateRole(postBody, id) {
        const role = await this.RoleDatabase.updateRole(postBody, id);
    
        if (!role) {
            throw new Error(`role not found`);
        }
        return role;
    }


}

module.exports = { RoleService };