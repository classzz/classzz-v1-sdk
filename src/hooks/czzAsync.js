export const czzAsync = () => {
    const state = {
        stat: "idle",
        data: null,
        error: null,
    };

    const setData = (data) => {
        state.data = data
        state.stat = "success"
        state.error = null
    }

    const setError = (error) => {
        state.data = null
        state.stat = "error"
        state.error = error
    }

    // run 用来触发异步请求
    const run = (promise) => {
        if (!promise || !promise.then) {
            throw new Error("请传入 Promise 类型数据");
        }
        return promise
            .then((data) => {
                setData(data);
                return {
                    isIdle: state.stat === "idle",
                    isLoading: state.stat === "loading",
                    isError: state.stat === "error",
                    isSuccess: state.stat === "success",
                    ...state,
                };
            })
            .catch((error) => {
                // catch会消化异常，如果不主动抛出，外面是接收不到异常的
                setError(error);
                return {
                    isIdle: state.stat === "idle",
                    isLoading: state.stat === "loading",
                    isError: state.stat === "error",
                    isSuccess: state.stat === "success",
                    ...state,
                };
            });
    };

    return { run };
};
