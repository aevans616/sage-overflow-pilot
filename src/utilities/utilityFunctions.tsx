import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getLastArticleId = async (setState: any, backend: any) => {
  try {
    // 1. Query the 'article' table
    // 2. Select only the 'id' column to minimize data transfer
    // 3. Order the results by 'id' in descending order to get the highest ID first
    // 4. Limit the result to 1 to only fetch the top record
    const { data, error } = await backend
      .from('article')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    // Handle potential errors from the Supabase query
    if (error) {
      console.error('Error fetching last article ID:', error.message);
      return null;
    }

    // Check if any data was returned
    if (data && data.length > 0) {
      // if last id exists...
      setState(data[0].id);
      setState((prevCount: number) => prevCount + 1);
      // console.log(lastId);
    } else {
      // No records found in the table
      console.log('No articles found in the table.');
      return null;
    }
  } catch (err) {
    // Catch any unexpected errors during the process
    console.error('An unexpected error occurred:', err);
    return null;
  }
};
//
//
//
//

export const publishArticle = async (
  backend: any,
  contentData: any,
  id: number
) => {
  const CD = contentData;
  try {
    const { data, error } = await backend
      .from('article')
      .insert([
        {
          // The object keys should match your table column names
          id: CD.id,
          author_id: CD.author_id,
          last_editor_id: CD.last_editor_id,
          title: CD.title,
          content: CD.content,
          created_at: CD.created_at,
          is_published: CD.is_published,
          last_modified: CD.last_modified,
          view_count: CD.view_count,
        },
      ])
      .select(); // .select() returns the inserted record(s)

    if (error) {
      throw error;
    }

    console.log('New item inserted:', data);
  } catch (err) {
    console.error('Error inserting item:', err.message);
  }
};
//
//
//
//
export const updateArticle = async (
  backend: any,
  contentData: any,
  id: number
) => {
  const CD = contentData;
  try {
    const { data, error } = await backend
      .from('article')
      .update({
        // The object keys should match your table column names
        // author_id: CD.author_id,
        // last_editor_id: CD.last_editor_id,
        title: CD.title,
        content: CD.content,
        // created_at: CD.created_at,
        // is_published: CD.is_published,
        // last_modified: CD.last_modified,
        // view_count: CD.view_count,
      })
      .eq('id', id)
      .select(); // .select() returns the updated record(s)

    if (error) {
      throw error;
    }

    console.log('Item updated:', data);
  } catch (err) {
    console.error('Error updating item:', err.message);
  }
};
//
//
//
//
export async function getArticles(setter?, backend, filter?) {
  const { data } = await backend.from('article').select(filter);
  setter(data);
  return data;
  //  console.log(data);
}
//
//
export async function getArticlesByID(setter?, backend?, rowId) {
  const { data } = await backend.from('article').select('*').eq('id', rowId);
  setter(data[0]);
  // console.log(data[0]);
}
//
//
//
//
// truncate article preview text if it has more than 290 characters
export const truncateText = (text: string, maxLength: number = 200): string => {
  // Check if the input text is valid and a string
  if (typeof text !== 'string') {
    console.warn(
      'truncateText: Input is not a string. Returning original input.'
    );
    return text;
  }

  // Check if the text length exceeds the maximum allowed length
  if (text.length > maxLength) {
    // If it does, truncate the string and append an ellipsis
    return text.substring(0, maxLength) + '...';
  } else {
    // If it doesn't, return the original string
    return text;
  }
};
//
//
//
//

export const formatTimestampToMonthDDYYYY = (
  timestamp: Date | number | string
): string => {
  try {
    // Create a Date object from the input timestamp
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid timestamp provided:', timestamp);
      return ''; // Return an empty string for invalid dates
    }

    // Get month (0-indexed), day, and year components
    const monthIndex = date.getMonth();
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString(); // Get last two digits of the year

    let monthAbbreviation: string;

    // Using a switch statement to assign three-letter month abbreviation
    switch (monthIndex) {
      case 0:
        monthAbbreviation = 'JAN';
        break;
      case 1:
        monthAbbreviation = 'FEB';
        break;
      case 2:
        monthAbbreviation = 'MAR';
        break;
      case 3:
        monthAbbreviation = 'APR';
        break;
      case 4:
        monthAbbreviation = 'MAY';
        break;
      case 5:
        monthAbbreviation = 'JUN';
        break;
      case 6:
        monthAbbreviation = 'JUL';
        break;
      case 7:
        monthAbbreviation = 'AUG';
        break;
      case 8:
        monthAbbreviation = 'SEP';
        break;
      case 9:
        monthAbbreviation = 'OCT';
        break;
      case 10:
        monthAbbreviation = 'NOV';
        break;
      case 11:
        monthAbbreviation = 'DEC';
        break;
      default:
        monthAbbreviation = 'UNK'; // Unknown month
    }

    return `${monthAbbreviation} ${day}, ${year}`;
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return ''; // Return an empty string in case of an unexpected error
  }
};
//
//
//
//
export async function incrementViewCount(viewCount: number, id: number) {
  try {
    // console.log(typeof viewCount);
    // console.log(typeof id);

    const newViewCount = viewCount + 1;

    const { error } = await supabase
      .from('article')
      .update({ view_count: newViewCount })
      .eq('id', id);

    if (error) {
      throw new Error(
        `Failed to increment view count for the article with id: ${id}`
      );
    }
  } catch (err) {
    console.log('Unexpected error incrementing view count', err);
  }
}
//
//
//
//
export const parseJsonData = (dataToProcess: string) => {
  if (!dataToProcess) {
    console.log('dataToProcess: ', dataToProcess);
    throw new Error('Error with provided argument');
  }
  const JSON_OBJ = JSON.parse(dataToProcess);
  // console.log(JSON_OBJ);
  return JSON_OBJ;
};
//
//
//
//

// Calculates the estimated read time of an article based on its word count.
// The default reading speed is set to 265 words per minute, which is a common average.

export const calculateReadTime = (
  articleText: string,
  wordsPerMinute: number = 265
): number | string => {
  // Check if articleText is valid
  if (!articleText || typeof articleText !== 'string') {
    return 0;
  }

  // Split the text by whitespace to get an array of words.
  // Filter out any empty strings that might result from multiple spaces.
  const words = articleText.split(/\s+/).filter((word) => word.length > 0);

  // Get the total number of words
  const wordCount = words.length;

  // Calculate the raw read time in minutes
  const rawReadTimeMinutes = wordCount / wordsPerMinute;

  // Round to the nearest whole minute
  const readTimeMinutes = Math.round(rawReadTimeMinutes);

  // Ensure a minimum of 1 minute for any content, even if it's very short,
  // as 0 minutes wouldn't be very informative.
  // console.log(Math.max(1, readTimeMinutes));
  return `${Math.max(1, readTimeMinutes)} min read`;
};
