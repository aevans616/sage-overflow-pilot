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
export const publishArticle = async (backend: any, contentData: any) => {
  try {
    const { data, error } = await backend
      .from('article')
      .insert([
        {
          // The object keys should match your table column names
          id: contentData.id,
          author_id: contentData.author_id,
          created_at: contentData.created_at,
          last_modified: contentData.last_modified,
          view_count: contentData.view_count,
          content: contentData.content,
          is_published: contentData.is_published,
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
