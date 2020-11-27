let enqueueSnackbar = null

const setEnqueueSnackbar = (f) => {
  enqueueSnackbar = f
}

const playSnackbar = (...args) => enqueueSnackbar(...args)

export {
  setEnqueueSnackbar,
  playSnackbar,
}
