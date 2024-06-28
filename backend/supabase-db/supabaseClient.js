const { supabaseURI, supabseKey } = require("../configs/supabase.config");

const createClient = require("@supabase/supabase-js").createClient

const otherOptions = {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
};

const supabaseInstance = createClient(supabaseURI, supabseKey, otherOptions);

module.exports = { supabaseInstance };