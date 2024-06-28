const statusCode = {
    // Informational responses (100-199)
    "100": { message: "Continue", code: "100" },
    "101": { message: "Switching Protocols", code: "101" },
    "102": { message: "Processing", code: "102" },
    "103": { message: "Early Hints", code: "103" },

    // Successful responses (200-299)
    "200": { message: "OK", code: "200" },
    "201": { message: "Created", code: "201" },
    "202": { message: "Accepted", code: "202" },
    "203": { message: "Non-Authoritative Information", code: "203" },
    "204": { message: "No Content", code: "204" },
    "205": { message: "Reset Content", code: "205" },
    "206": { message: "Partial Content", code: "206" },
    "207": { message: "Multi-Status", code: "207" },
    "208": { message: "Already Reported", code: "208" },
    "226": { message: "IM Used", code: "226" },

    // Redirection responses (300-399)
    "300": { message: "Multiple Choices", code: "300" },
    "301": { message: "Moved Permanently", code: "301" },
    "302": { message: "Found", code: "302" },
    "303": { message: "See Other", code: "303" },
    "304": { message: "Not Modified", code: "304" },
    "305": { message: "Use Proxy", code: "305" },
    "307": { message: "Temporary Redirect", code: "307" },
    "308": { message: "Permanent Redirect", code: "308" },

    // Client errors (400-499)
    "400": { message: "Bad Request", code: "400" },
    "401": { message: "Unauthorized", code: "401" },
    "402": { message: "Payment Required", code: "402" },
    "403": { message: "Forbidden", code: "403" },
    "404": { message: "Not Found", code: "404" },
    "405": { message: "Method Not Allowed", code: "405" },
    "406": { message: "Not Acceptable", code: "406" },
    "407": { message: "Proxy Authentication Required", code: "407" },
    "408": { message: "Request Timeout", code: "408" },
    "409": { message: "Conflict", code: "409" },
    "410": { message: "Gone", code: "410" },
    "411": { message: "Length Required", code: "411" },
    "412": { message: "Precondition Failed", code: "412" },
    "413": { message: "Payload Too Large", code: "413" },
    "414": { message: "URI Too Long", code: "414" },
    "415": { message: "Unsupported Media Type", code: "415" },
    "416": { message: "Range Not Satisfiable", code: "416" },
    "417": { message: "Expectation Failed", code: "417" },
    "418": { message: "I'm a Teapot", code: "418" },
    "421": { message: "Misdirected Request", code: "421" },
    "422": { message: "Unprocessable Entity", code: "422" },
    "423": { message: "Locked", code: "423" },
    "424": { message: "Failed Dependency", code: "424" },
    "425": { message: "Too Early", code: "425" },
    "426": { message: "Upgrade Required", code: "426" },
    "428": { message: "Precondition Required", code: "428" },
    "429": { message: "Too Many Requests", code: "429" },
    "431": { message: "Request Header Fields Too Large", code: "431" },
    "451": { message: "Unavailable For Legal Reasons", code: "451" },

    // Server errors (500-599)
    "500": { message: "Internal Server Error", code: "500" },
    "501": { message: "Not Implemented", code: "501" },
    "502": { message: "Bad Gateway", code: "502" },
    "503": { message: "Service Unavailable", code: "503" },
    "504": { message: "Gateway Timeout", code: "504" },
    "505": { message: "HTTP Version Not Supported", code: "505" },
    "506": { message: "Variant Also Negotiates", code: "506" },
    "507": { message: "Insufficient Storage", code: "507" },
    "508": { message: "Loop Detected", code: "508" },
    "510": { message: "Not Extended", code: "510" },
    "511": { message: "Network Authentication Required", code: "511" }
};

const responseHandler = (res, _statusCode, data = null) => {
    const obj = statusCode[_statusCode]
    const responseJson = {
        ...obj,
        ...data
    }
    res.status(_statusCode).json(responseJson)
}
module.exports = { responseHandler };

/*-----------------------------------For Scuccess respons---------------------------------------------- 
responseHandler(res,200, {data:data})
*/
/*-----------------------------------For error  respons----------------------------------------------
responseHandler(res,500)
*/

/*-----------------------------------For error to override message respons---------------------------------------------- 
responseHandler(res,500, {message:"Someything Went Wrong"})
or
responseHandler(res,500, {message:e.message})
*/
