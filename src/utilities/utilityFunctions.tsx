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
//TODO error handling for if title or content is missing
export const publishArticle = async (backend: any, contentData: any) => {
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
export async function getArticle(setter?, backend) {
  const { data } = await backend.from('article').select();
  setter(data);
  //  console.log(data);
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

    return `${monthAbbreviation} ${day} ${year}`;
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return ''; // Return an empty string in case of an unexpected error
  }
};
