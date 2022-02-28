from flask_restful import Resource, reqparse
import chess
import chess.engine

class ChessApiHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Chess Api Handler"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('position', type=str)
    args = parser.parse_args()

    position = args['position']
    print('position {}'.format(position))

    """
    Calculate next move based on current board
    """
    b = chess.Board(position)
    print(b)
    engine = chess.engine.SimpleEngine.popen_uci("stockfish")
    result = engine.play(b, chess.engine.Limit(time=0.5))
    # b.push(result.move)
    move = str(result.move)
    engine.quit()

    if not position:
        move = "No position to analyze"
    final_ret = {"status": "Success", "move": move}

    return final_ret