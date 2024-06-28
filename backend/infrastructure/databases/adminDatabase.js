const tableName = 'user';
const cryptoJs = require('crypto-js');
const secret = "secret"

class AdminDatabase {
    constructor(db) {
        this.db = db;
    }

    async createAdmin(postBody) {
        const hash = cryptoJs.AES.encrypt(postBody.password.toString(), secret).toString();
        const admin = await this.db.from(tableName).insert({ ...postBody, password: hash }).select(`id,name,email,role_id,phone`).maybeSingle();
        if (!admin.data) {
            throw admin?.error?.message;
        }
        return admin;
    }


    async updateAdmin(postBody, id) {
        const admin = await this.db.from(tableName).update(postBody).eq("id", id).select(`id,name,email,role_id,phone`).maybeSingle()
        if (!admin.data) {
            throw admin?.error?.message;
        }
        return admin;
    }
    async login(postBody) {
        try {
            const data = await this.db.from(tableName).select("id,name,email,role_id,password").eq("email", postBody.email)
            var decrypted = cryptoJs.AES.decrypt(data?.data[0].password, secret).toString(cryptoJs.enc.Utf8);
            if (!(decrypted === postBody.password)) {
                console.log("invalid admin")
                return false
            }
            delete data?.data[0].password;
            return data.data
        } catch (error) {
            throw admin?.error?.message || `admin not found`;
        }
    }
    
    async getAdmin(page, limit) {
        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(limit) || 10;

        const admin = await this.db.from(tableName).select(`id,name,email,phone,role_id(name,access,id)`, { count: "exact" })
            .range((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage - 1)

        if (admin) {
            const totalPages = Math.ceil(admin.count / itemsPerPage);

            const data = {
                ...admin,
                metadata: {
                    page: pageNumber,
                    perPage: itemsPerPage,
                    totalPages,
                    totalCount: admin.count
                }
            }
            return data

        } else {
            throw admin?.error?.message || `admin not found`;
        }
    }
}

module.exports = AdminDatabase;
