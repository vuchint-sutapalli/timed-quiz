const config = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appWriteQuestionCollectionId: String(
    import.meta.env.VITE_APPWRITE_QUESTION_COLLECTION_ID
  ),
  appWriteQuizCollectionId: String(
    import.meta.env.VITE_APPWRITE_QUIZ_COLLECTION_ID
  ),
  appWriteQuizSessionsCollectionId: String(
    import.meta.env.VITE_APPWRITE_QUIZ_SESSIONS_COLLECTION_ID
  ),

  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
