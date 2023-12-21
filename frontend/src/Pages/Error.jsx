import errorImage from '../assets/error.jpg'
export default function Error() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <img
        src={errorImage}
        alt="404"
        className="object-cover h-full w-full"
        style={{ objectPosition: 'center' }}
      />
    </div>
  )
}
