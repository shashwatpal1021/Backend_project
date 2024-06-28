const tableName = 'role';



class RoleDatabase {
    constructor(db) {
        this.db = db;
    }

    async createRole(postBody) {
        const role = await this.db.from(tableName).insert({ ...postBody }).select(`id,name,access`).maybeSingle();

        if (!role.data) {
            throw role?.error?.message;
        }
        return role;
    }

    async getRole() {
        let role = await this.db.from(tableName).select(`id,name,access`);
        if (!role.data) {
            throw role?.error?.message;
        }
        return role;
    }

    async updateRole(postBody, id) {
        const role = await this.db.from(tableName).update(postBody).eq("id", id).select(`id,name,access`).maybeSingle()
        if (!role.data) {
            throw role?.error?.message;
        }
        return role;
    }
}

module.exports = RoleDatabase;
