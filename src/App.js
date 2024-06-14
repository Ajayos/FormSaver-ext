import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: '20px',
  },
  button: {
    marginTop: '10px',
  },
});

const App = () => {
  const classes = useStyles();
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    // Fetch all stored data
    chrome.storage.local.get(null, (items) => {
      setStoredData(Object.entries(items));
    });
  }, []);

  const clearStorage = () => {
    chrome.storage.local.clear(() => {
      console.log('All storage data cleared.');
      setStoredData([]);
    });
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Stored Form Data
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={clearStorage}
      >
        Clear All Data
      </Button>
      <List>
        {storedData.length > 0 ? (
          storedData.map(([url, data]) => (
            <ListItem key={url}>
              <ListItemText primary={url} secondary={JSON.stringify(data)} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No stored data available.</Typography>
        )}
      </List>
    </Container>
  );
};

export default App;
