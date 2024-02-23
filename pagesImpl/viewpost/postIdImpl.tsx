import styled from '@emotion/styled'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'

interface PostIdImplProps {
  postId: string | string[] | undefined;
}

const PostIdImpl: React.FC<PostIdImplProps> = ({ postId }) => {
  return (
    <div>
      <h1>Post ID: {postId}</h1>
      {/* You can display the post content here */}
    </div>
  );
};

export default PostIdImpl;