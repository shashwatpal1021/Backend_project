const config = {
    auth_key: "xxxxxxxxxxxxxxxxxx",
    senderId: "xxxxxxxxxxxxxxxxxxxx",
    email_domain: "xxxxxxxxxxxxxx",
    email_from: "xxxxxxxxxxxxxxx",

    //* templates
    otp_template_id: 'xxxxxxxxxxxxxxxxxx',
    email_otp_template_id: "xxxxxxxxxxxx",
    feedback_template_id: "xxxxxxxxxxxxxxx",
    order_delivered_template_id: "xxxxxxxxxxxxxxxx",
    order_cancellation_template_id: "xxxxxxxxxxxxxxxx",
    refund_template_id: "xxxxxxxxxxxxxxxx",
    welcome_template_id: "xxxxxxxxxxxxxxx",
    order_confirmation_template_id: "xxxxxxxxxxxxx",



    //* API
    send_mobile_otp_api: 'xxxxxxxxxxxxxxxxxxx',
    verify_mobile_otp_api: 'xxxxxxxxxxxxxxxxxxx',
    send_email_api: 'xxxxxxxxxxxxxxxxxxx',
    send_mobile_sms: 'xxxxxxxxxxxxxxxxxx',
};

exports.config = config;