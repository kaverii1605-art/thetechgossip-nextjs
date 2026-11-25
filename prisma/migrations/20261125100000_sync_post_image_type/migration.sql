-- Synchronize the Post.image column with the current database schema.
ALTER TABLE `post`
MODIFY `image` TEXT NULL;