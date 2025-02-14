// Calculate Term Frequency (TF)
const calculateTF = (texts) => {
    return texts.map(text => {
      const tfDict = {};
      const words = text.split(" ");
      const totalWords = words.length;
      
      words.forEach(word => {
        if (tfDict[word]) {
          tfDict[word] += 1;
        } else {
          tfDict[word] = 1;
        }
      });
  
      Object.keys(tfDict).forEach(word => {
        tfDict[word] = tfDict[word] / totalWords;
      });
  
      return tfDict;
    });
  };
  
  // Calculate Inverse Document Frequency (IDF)
  const calculateIDF = (texts) => {
    const idfDict = {};
    const totalDocs = texts.length;
  
    texts.forEach(text => {
      const words = new Set(text.split(" "));
  
      words.forEach(word => {
        if (idfDict[word]) {
          idfDict[word] += 1;
        } else {
          idfDict[word] = 1;
        }
      });
    });
  
    Object.keys(idfDict).forEach(word => {
      idfDict[word] = Math.log(totalDocs / idfDict[word]);
    });
  
    return idfDict;
  };
  
  // Calculate TF-IDF
  export const tfidf = (texts) => {
    const tf = calculateTF(texts);
    const idf = calculateIDF(texts);
  
    return tf.map(tfDict => {
      const tfidfDict = {};
  
      Object.keys(tfDict).forEach(word => {
        tfidfDict[word] = tfDict[word] * idf[word];
      });
  
      return tfidfDict;
    });
  };
  
  // Calculate Cosine Similarity
  export const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = (a, b) => {
      let sum = 0;
      Object.keys(a).forEach(key => {
        if (b[key]) {
          sum += a[key] * b[key];
        }
      });
      return sum;
    };
  
    const magnitude = (vec) => {
      let sum = 0;
      Object.keys(vec).forEach(key => {
        sum += vec[key] * vec[key];
      });
      return Math.sqrt(sum);
    };
  
    const dot = dotProduct(vecA, vecB);
    const magA = magnitude(vecA);
    const magB = magnitude(vecB);
  
    return dot / (magA * magB);
  };
  