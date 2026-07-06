async function getUserPosts(userId) {
  try {
    const user = await fetchUser(userId);
    return await fetchPosts(user.id);
  } catch (e) {
    console.error(e);
  }
}
