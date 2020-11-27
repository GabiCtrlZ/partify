module.exports = ({ stopUserAuthCycle }) => (
  req,
  res,
  next
) => {
  const {
    query: { error, state },
    logger,
  } = req
  
  if (error) {
    logger.warn(
      `Got auth Error in callback route for id ${state} redirecting to authError`
    )

    return res.redirect('/authError')
  }
  return next()
}
