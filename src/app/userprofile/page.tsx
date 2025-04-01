import UserProfilePage from '@/components/UserProfilePage';
import NavBar from '@/components/NavBar';
import '@/styles.css';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function UserProfile() {
  const user = await getCurrentUser();
  //check for undefined user
  if (user) {
    return (
      <>
        <NavBar />

        {!user.profileFinished && (
          <div className="user-profile-not-finished-warning-container">
            <h1 className="user-profile-not-finished-warning">
              Please Complete Profile To Continue
            </h1>
          </div>
        )}
        <div className="user-profile-page-container">
          <UserProfilePage
            currentUser={JSON.parse(JSON.stringify(user))}
            person={JSON.parse(JSON.stringify(user))}
          ></UserProfilePage>
        </div>
      </>
    );
  } else {
    redirect('/');
  }
}
