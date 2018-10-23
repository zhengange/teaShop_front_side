Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top',
    theme: 'flat'
};

function MessengerSuccess(message) {
    Messenger().post({
        message: message,
        hideAfter: 3,
        hideOnNavigate: true,
        type: 'info',
        showCloseButton: true
    });
}
function MessengerError(message) {
    Messenger().post({
        message: message,
        type: 'error',
        showCloseButton: true
    });
}

function MessengerConfirm(message) {
    var msg = Messenger().post({
        message: message,
        actions: {
            Cancel: {
                label: "确定",
                action: function () {
                    return msg.cancel();
                }
            }
        }

    });
}

function MessengerAjaxPostConfirmTwice(tipMessageFirst, tipMessageSecond, postAction, data, updateFunction) {
    var msg = Messenger().post(
        {
            message: tipMessageFirst,
            actions:
            {
                DoDelete: {
                    label: "确定",
                    action: function () {
                        msg.cancel();
                        MessengerAjaxPostConfirm(tipMessageSecond, postAction, data, updateFunction);
                    }
                },
                Cancel:
                {
                    label: "取消",
                    action: function () {
                        return msg.cancel();
                    }
                }
            }
        }
    );
}

function MessengerAjaxPostConfirm(tipMessage, postAction, para, updateFunction) {
    var msg = Messenger().post(
        {
            message: tipMessage,
            actions:
            {
                DoDelete: {
                    label: "确定",
                    action: function () {
                        $.post(postAction, para)
                            .success(function (response) {
                                if (response.code == 1) {
                                    if (null != updateFunction)
                                        updateFunction();
                                    return msg.update({
                                        message: response.msg,
                                        hideAfter: 3,
                                        hideOnNavigate: true,
                                        type: 'success',
                                        showCloseButton: true,
                                        actions: false
                                    });
                                } else {
                                    return msg.update({
                                        message: response.msg,
                                        type: 'error',
                                        showCloseButton: true
                                    });
                                }
                            })
                            .error(function (response) {
                                return msg.update({
                                    message: '请求失败',
                                    type: 'error',
                                    showCloseButton: true
                                });
                            });
                    }
                },
                Cancel:
                {
                    label: "取消",
                    action: function () {
                        return msg.cancel();
                    }
                }
            }
        }
    );
}

function MessengerAjaxPost(postAction, para, updateFunction) {
    $.post(postAction, para)
        .success(function (response) {
            if (response.code == 1) {
                MessengerSuccess(response.msg);
                if (null != updateFunction) {
                    if (response.data != undefined) {
                        updateFunction(response.data);
                    } else {
                        updateFunction();
                    }
                }
            }
            // else if (response.confirm) {
            //     MessengerConfirm(response.msg);
            // }
            else {
                MessengerError(response.msg);
            }
        }).error(function (response) {
            if (response.msg != undefined) {
                MessengerError(response.msg);
            } else {
                MessengerError("请求失败");
            }
        });
}

function MessengerAjaxPostWithErrFunction(postAction, para, updateFunction, errFunction) {
    $.post(postAction, para)
        .success(function (response) {
            if (response.code == 1) {
                MessengerSuccess(response.msg);
                if (null != updateFunction) {
                    if (response.data != undefined) {
                        updateFunction(response.data);
                    } else {
                        updateFunction();
                    }
                }
            }
            // else if (response.confirm) {
            //     MessengerConfirm(response.message);
            // }
            else {
                MessengerError(response.msg);

                if (null != errFunction) {
                    if (response.data != undefined) {
                        errFunction(response.data);
                    } else {
                        errFunction();
                    }
                }
            }
        }).error(function (response) {
            if (response.msg != undefined) {
                MessengerError(response.msg);
            } else {
                MessengerError("请求失败");
            }

            if (null != errFunction) {
                if (response.data != undefined) {
                    errFunction(response.data);
                } else {
                    errFunction();
                }
            }
        });
}

function MessengerAjaxPostAndClientDirect(postAction, para, newUrl) {
    $.post(postAction, para)
        .success(function (response) {
            if (response.code == 1) {
                location.href = newUrl;
            }
            // else if (response.confirm) {
            //     MessengerConfirm(response.message);
            // }
            else {
                MessengerError(response.msg);
            }
        }).error(function (response) {
            if (response.msg != undefined) {
                MessengerError(response.msg);
            } else {
                MessengerError("请求失败");
            }
        });
}

// function MessengerAjaxPostAndServerDirect(postAction, para) {
//     $.post(postAction, para)
//         .success(function (response) {
//             if (response.success) {
//                 location.href = response.directUrl;
//             } else if (response.confirm) {
//                 MessengerConfirm(response.message);
//             } else {
//                 MessengerError(response.message);
//             }
//         }).error(function (response) {
//             if (response.Message != undefined) {
//                 MessengerError(response.Message);
//             } else {
//                 MessengerError("请求失败");
//             }
//         });
// }

function MessengerAjaxGet(action, para, updateFunction) {
    $.get(action, para)
        .success(function (response) {
            if (response.code == 1) {
                updateFunction(response.data);
            } else {
                MessengerError(response.msg);
            }
        })
        .error(function (response) {
            if (response.msg != undefined) {
                MessengerError(response.msg);
            } else {
                MessengerError("请求失败");
            }
        });
}

function MessengerOptions(updateFunction) {
    var options = {
        success: function (response) {
            if (response.code == 1) {
                updateFunction();
            } else {
                MessengerError(response.msg);
            }
        },
        error: function (response) {
            if (response.msg != undefined) {
                MessengerError(response.msg);
            } else {
                MessengerError("请求失败");
            }
        }
    };
    return options;
}