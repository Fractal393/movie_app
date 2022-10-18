import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#ffffff",
      contrastText: "#0971f1",
    },
  },
});

function User() {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    console.log(user);
    await fetch("/logout", {
      method: "POST",
    })
      .then((response) => {
        console.log(user, response);
        if (response.status === 200) {
          return response.json();
        } else alert("Error");
      })
      .then((response) => {
        console.log(response);
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(user);
    fetch("/@me")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        console.log(response);
        setUser(response);
      })
      .catch((error) => console.log("Not authenticated"));
  }, []);

  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState();

  function onClick() {
    setTitles((c) => [...c, title]);
  }

  function onInput(title) {
    setTitle(title);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Movie Review
          </Typography>
          {user == null ? (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="neutral">
                Login
              </Button>
            </Link>
          ) : (
            <Button variant="contained" color="neutral" onClick={logoutUser}>
              Logout{user.id}
              {user.email}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movie Review
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A movie review is an article that is published in a newspaper,
              magazine, or scholarly work that describes and evaluates a movie.
              Reviews are typically written by journalists giving their opinion
              of the movie. Some reviews include score (4 out of 5 stars) or
              recommendations (thumbs up).
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Add Movies</Button> */}
              {/*               <Button variant="outlined">Secondary action</Button>
               */}{" "}
            </Stack>
          </Container>
          {user == null ? (
            <Typography
              variant="h3"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Log in for a better experience.
            </Typography>
          ) : (
            <Typography
              variant="h4"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Hello {user.email}!
            </Typography>
          )}
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      After more than 30 years of service as one of the Navy's
                      top aviators, Pete "Maverick" Mitchell is where he
                      belongs, pushing the envelope as a courageous test pilot
                      and dodging the advancement in rank that would ground him.
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                      Reviews:
                    </Typography>
                    {titles.map((c) => (
                      <>
                        {user.email} | {c} <br />
                      </>
                    ))}
                    <input
                      type="text"
                      name="review"
                      placeholder="Type Here.."
                      onInput={(e) => onInput(e.target.value)}
                    ></input>
                    {user == null ? (
                      <Typography> Please Login to add a Review </Typography>
                    ) : (
                      <Button onClick={onClick}>Add Review</Button>
                    )}
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Providing the best reviews for movies!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default User;
