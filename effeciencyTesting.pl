#!/usr/bin/perl
use warnings;
use strict;

die "Usage: \n$0 [NewsKeywordFile.txt]\n" if @ARGV < 1;

# Open input file, clear/create output file
my $newsTopicsFile = $ARGV[0];
open my $fh, "<", $newsTopicsFile or die "Could not open input file $newsTopicsFile\n";
open my $output, ">", "testResults.txt" or die "Could not open results file testResults.txt\n";
print $output "";
close $output;

#Authorise user and get token
my $token = `curl --request POST --url http://api.restfulnews.com/auth --header 'content-type: application/json' --data '{ "email": "steven\@restfulnews.com", "password": "accident8" }'`;
$token =~ s/^.+token\":\"(.*?)\".*$/$1/;
print "token: [$token]\n";
die "Invalid token\n" if $token =~ /[\[\{\]\}]\"/;

# repoen the output file so that printing to it will append to file
open my $output, ">>", "testResults.txt" or die "Could not open results file testResults.txt\n";
print $output "Timing data for News Searching\n";

# Search for every word in the input file as a separate topic
foreach my $line (<$fh>) {
    my @words = split(/[ ,\.\/]/, $line);
    foreach my $word (@words) {
        chomp $word;
        print $output "\nTopic: $word\n";
        my $url = "http://api.restfulnews.com/search?topics=";
        $url .= $word;
        $url .= "&start_date=2011-02-22T23:39:03.000Z&end_date=2018-02-22T23:39:03.000Z";
        $url =~s/\r//;
        my $timing = `time curl --request GET --url '$url' --header 'authorization: Bearer $token' --header 'content-type: application/json'`;
        print $output "$timing\n";
    }
}
close $fh;
close $output;

# Collate timing results
open my $results, "<", "testResults.txt" or die "Failed to open results file\n";
my $totalSecs = 0;
my $numTopics = 0;
foreach my $line (<$results>) {
    if ($line =~ /real/) {
        $line =~ s/^.*real\s(\d+m\d+\.\d+s).*$/$1/;
        my $min = $line;
        $min =~ s/(\d+)m.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.+m(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $totalSecs += $min + $sec;
        $numTopics += 1;
    }
}

printf ("Average Search time:\n%.4f seconds\n", $totalSecs/$numTopics);

`rm testResults.txt`;
print "All cleaned up!\n";
