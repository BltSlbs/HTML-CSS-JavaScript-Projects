$(document).ready(function() {
    var holding = [],
        moves,
        disksNum = 7,
        minMoves = 127,
        $canves = $('#canves'),
        $restart = $canves.find('.restart'),
        $tower = $canves.find('.tower'),
        $scorePanel = $canves.find('#score-panel'),
        $movesCount = $scorePanel.find('#moves-num'),
        $ratingStars = $scorePanel.find('i'),
        rating = 3;
    function initGame(tower) {
        $tower.html('');
        moves = 0;
        $movesCount.html(0);
        holding = [];
        for (var i = 1; i <= disksNum; i++) {
            tower.prepend($('<li class="disk disk-' + i + '" data-value="' + i + '"></li>'));
        }
        $ratingStars.each(function() {
            $(this).removeClass('fa-star-o').addClass('fa-star');
        });
    }
    function countMove() {
        moves++;
        $movesCount.html(moves);
        if (moves > minMoves - 1) {
            if ($tower.eq(1).children().length === disksNum || $tower.eq(2).children().length === disksNum) {
                swal({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    title: 'Congratulations! You Won!',
                    text: "Congratulations!",
                    type: 'success',
                    confirmButtonColor: '#Green',
                    confirmButtonText: 'Play again!'
                }).then(function(isConfirm) {
                    if (isConfirm) {
                        initGame($tower.eq(0));
                    }
                })
            }
        }  
        setRating(moves);
    }
    function tower(tower) {
        var $disks = tower.children(),
            $topDisk = tower.find(':last-child'),
            topDiskValue = $topDisk.data('value'),
            $holdingDisk = $canves.find('.hold');

        if ($holdingDisk.length !== 0) {
            if (topDiskValue === holding[0]) {
                $holdingDisk.removeClass('hold');
            } else if (topDiskValue === undefined || topDiskValue > holding[0]) {
                $holdingDisk.remove();
                tower.append($('<li class="disk disk-' + holding[0] + '" data-value="' + holding[0] + '"></li>'));
                countMove();
            }
        } else if ($topDisk.length !== 0) {
            $topDisk.addClass('hold');
            holding[0] = topDiskValue;
        }
    }
    initGame($tower.eq(0));
    $canves.on('click', '.tower', function() {
        var $this = $(this);
        tower($this);
    });
    $restart.on('click', function() {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Are you sure?',
            text: "Your progress will be Lost!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#Green',
            cancelButtonColor: '#Red',
            confirmButtonText: 'Yes, Restart Game!'
        }).then(function(isConfirm) {
            if (isConfirm) {
                initGame($tower.eq(0));
            }
        })
    });
});
