import config from "../config";

import { Client, Databases, Storage, Query, ID } from "appwrite";

export class DbService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getQuestions(queries = [Query.equal("difficulty", "easy")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getQuestions() :: ", error);
      return false;
    }
  }

  async createQuestion({
    title,
    type,
    difficulty = "easy",
    userId,
    options,
    answers,
    tags = [],
  }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteQuestionCollectionId,
        ID.unique(),
        {
          title,
          type,
          difficulty,
          userId,
          options,
          answers,
          tags,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createQuestion() :: ", error);
      return false;
    }
  }
  async deleteQuestion(docId) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteQuestionCollectionId,
        docId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteQuestion() :: ", error);
      return false;
    }
  }

  async getQuizMetadata(quizId) {
    try {
      const result = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteQuizCollectionId,
        [
          Query.equal("$id", quizId),
          Query.select(["$id", "quizTitle", "questions"]),
        ]
      );
      const queriedQuiz = result.documents[0];

      const relevantQuestions = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteQuestionCollectionId,
        [
          Query.contains("$id", queriedQuiz.questions),
          Query.select(["$id", "difficulty", "type"]),
        ]
      );

      queriedQuiz.questions = relevantQuestions.documents;

      return queriedQuiz;
    } catch (error) {
      console.log("Appwrite service :: deleteQuestion() :: ", error);
      return false;
    }
  }

  async checkQuizSessionState({ user_id, quiz_id }) {
    try {
      // Query to find a document with the given userId and quizId
      let returnObj = {
        completed_at: null,
        is_completed: false,
        score: null,
        state: "not_started",
        session_id: null,
        started_at: null,
      };
      const response = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteQuizSessionsCollectionId,
        [Query.equal("user_id", user_id), Query.equal("quiz_id", quiz_id)]
      );

      if (response.total) {
        let quizSession = response.documents[0];
        returnObj.session_id = quizSession.$id;
        returnObj.started_at = quizSession.started_at;

        if (quizSession?.is_completed) {
          returnObj.completed_at = quizSession.completed_at;
          returnObj.is_completed = quizSession.is_completed;
          returnObj.score = quizSession.score;
          returnObj.state = "completed";
        } else {
          returnObj.state = "in_progress";
        }
      }

      console.log("respppp", response, returnObj);

      // Check if any documents were found
      return returnObj;
    } catch (error) {
      console.error("Appwrite service :: checkQuizSessionState() ::", error);
      return false; // Optionally, handle error cases differently if needed
    }
  }

  async createQuizSession({ user_id, quiz_id, started_at }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteQuizSessionsCollectionId,
        ID.unique(),
        {
          quiz_id,
          started_at,
          user_id,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createQuizSession() :: ", error);
      return false;
    }
  }

  //storage service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appWriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appWriteBucketId, fileId).href;
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }
}

const dbService = new DbService();

export default dbService;
