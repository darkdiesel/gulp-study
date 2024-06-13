module.exports = function() {
    notifyInfo = {
        title: 'Gulp'
    };

    plumberErrorHandler = { errorHandler: $.gp.notify.onError({
            title: notifyInfo.title,
            icon: notifyInfo.icon,
            message: "Error: <%= error.message %>"
        })
    };
};
