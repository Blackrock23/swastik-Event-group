import os

FILE_NAME = "users.txt"

# Create file if it doesn't exist
if not os.path.exists(FILE_NAME):
    open(FILE_NAME, "w").close()


def signup():
    username = input("Enter new username: ")
    password = input("Enter new password: ")

    # Check if username already exists
    with open(FILE_NAME, "r") as file:
        users = file.readlines()
        for user in users:
            stored_username, _ = user.strip().split(",")
            if stored_username == username:
                print("Username already exists! Try again.")
                return

    # Save new user
    with open(FILE_NAME, "a") as file:
        file.write(f"{username},{password}\n")

    print("Signup successful!")


def login():
    username = input("Enter username: ")
    password = input("Enter password: ")

    with open(FILE_NAME, "r") as file:
        users = file.readlines()
        for user in users:
            stored_username, stored_password = user.strip().split(",")
            if stored_username == username and stored_password == password:
                print("Login successful!")
                return

    print("Invalid username or password.")


def main():
    while True:
        print("\n1. Signup")
        print("2. Login")
        print("3. Exit")

        choice = input("Choose an option 1 or 2 or 3: ")

        if choice == "1":
            signup()
        elif choice == "2":
            login()
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")


if __name__ == "__main__":
    main()
