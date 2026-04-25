def callback(commit):
    if commit.author_email == b"abhijeetn.pm@gmail.com":
        commit.author_name = b"Aviskha Dey"
        commit.author_email = b"aviskhadey05@gmail.com"

    if commit.committer_email == b"abhijeetn.pm@gmail.com":
        commit.committer_name = b"Aviskha Dey"
        commit.committer_email = b"aviskhadey05@gmail.com"