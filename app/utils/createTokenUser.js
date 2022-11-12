const createTokenUser = (user) => {
    return {
        userId: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        organizer: user.organizer,
    }
}

module.exports = createTokenUser