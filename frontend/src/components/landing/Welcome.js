function Welcome()
{
  return (
    <div className="p-8">
      <p>
                Welcome to SSCatFacts! Here, you can browse and like many cat facts.
      </p>
      <br></br>
      <p>
                This website has three sections:
      </p>
      <br></br>
      <ul>
        <li>Facts: Full list of cat facts.</li>
        <li>Likes: List of facts you like.</li>
        <li>Popular: Most liked facts.</li>
      </ul>
    </div>
  );
}

export default Welcome;